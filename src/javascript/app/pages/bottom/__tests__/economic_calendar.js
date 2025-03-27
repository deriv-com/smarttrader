const expect = require('chai').expect;
const React = require('react');
const { render, screen, fireEvent, waitFor } = require('@testing-library/react');
const { act } = require('react-dom/test-utils');
const BinarySocket = require('../../../base/socket');
const EconomicCalendar = require('../economic_calendar.jsx').default;

jest.mock('../../../base/socket');

describe('EconomicCalendar', () => {
    const mockEvent = {
        release_date: '2024-02-20T13:30:00Z',
        event_name: 'US GDP',
        currency: 'USD',
        forecast: { display_value: '2.5%' },
        impact: { display_value: 'high' }
    };

    const mockResponse = {
        economic_calendar: {
            events: [mockEvent]
        }
    };

    beforeEach(() => {
        BinarySocket.send.mockImplementation(() => Promise.resolve(mockResponse));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders loading state initially', () => {
        render(<EconomicCalendar />);
        expect(screen.getByText('Loading economic calendar data...')).to.exist;
    });

    it('fetches and displays economic calendar data', async () => {
        render(<EconomicCalendar />);

        await waitFor(() => {
            expect(BinarySocket.send).to.have.been.calledWith({ economic_calendar: 1 });
            expect(screen.getByText('US GDP')).to.exist;
            expect(screen.getByText('USD')).to.exist;
            expect(screen.getByText('2.5%')).to.exist;
            expect(screen.getByText('high')).to.exist;
        });
    });

    it('formats date correctly', async () => {
        render(<EconomicCalendar />);

        await waitFor(() => {
            const formattedDate = screen.getByText('20/02/2024');
            expect(formattedDate).to.exist;
        });
    });

    it('handles empty data', async () => {
        BinarySocket.send.mockImplementationOnce(() => 
            Promise.resolve({ economic_calendar: { events: [] } })
        );

        render(<EconomicCalendar />);

        await waitFor(() => {
            expect(screen.getByText('No economic calendar events available')).to.exist;
        });
    });

    it('handles API error', async () => {
        BinarySocket.send.mockImplementationOnce(() => 
            Promise.reject(new Error('API Error'))
        );

        render(<EconomicCalendar />);

        await waitFor(() => {
            expect(screen.getByText('No economic calendar events available')).to.exist;
        });
    });

    it('applies correct impact class', async () => {
        render(<EconomicCalendar />);

        await waitFor(() => {
            const impactCell = screen.getByText('high').closest('td');
            expect(impactCell.classList.contains('high-impact')).to.be.true;
        });
    });

    it('refreshes data periodically', async () => {
        jest.useFakeTimers();
        render(<EconomicCalendar />);

        await waitFor(() => {
            expect(BinarySocket.send).to.have.been.calledTimes(1);
        });

        act(() => {
            jest.advanceTimersByTime(5 * 60 * 1000); // 5 minutes
        });

        expect(BinarySocket.send).to.have.been.calledTimes(2);

        jest.useRealTimers();
    });

    it('handles missing forecast values', async () => {
        const eventWithoutForecast = {
            ...mockEvent,
            forecast: null
        };

        BinarySocket.send.mockImplementationOnce(() => 
            Promise.resolve({ 
                economic_calendar: { 
                    events: [eventWithoutForecast] 
                } 
            })
        );

        render(<EconomicCalendar />);

        await waitFor(() => {
            const cells = screen.getAllByRole('cell');
            const forecastCell = cells.find(cell => cell.textContent === '-');
            expect(forecastCell).to.exist;
        });
    });

    it('handles cleanup on unmount', () => {
        jest.useFakeTimers();
        const { unmount } = render(<EconomicCalendar />);

        unmount();

        act(() => {
            jest.advanceTimersByTime(5 * 60 * 1000);
        });

        expect(BinarySocket.send).to.have.been.calledTimes(1); // Only initial call, no refresh after unmount

        jest.useRealTimers();
    });
});
