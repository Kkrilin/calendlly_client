import BookEventPopOver from '../Utils/PopOver/BookEventPopOver';

const TimeSlot = ({
  timeSlot,
  bookTime,
  setBookTime,
  date,
  setBookingResponse,
  formerTimeSlot,
  reschedule,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
      }}
    >
      <span
        className="book_time"
        style={{
          backgroundColor: `${bookTime === timeSlot ? 'grey' : 'white'}`,
          width: `${bookTime === timeSlot ? '6.5rem' : '14rem'}`,
          color: `${bookTime === timeSlot ? 'white' : '#0066e6'}`,
        }}
        onClick={(e) => setBookTime(e.target.innerText)}
      >
        {timeSlot}
        {formerTimeSlot === timeSlot ? (
          <p style={{ fontSize: '12px', color: 'blueviolet' }}>(older slot)</p>
        ) : (
          ''
        )}
      </span>
      {bookTime === timeSlot && (
        <BookEventPopOver
          setBookingResponse={setBookingResponse}
          bookTime={bookTime}
          bookDate={date}
          reschedule={reschedule}
        >
          next
        </BookEventPopOver>
      )}
    </div>
  );
};

export default TimeSlot;
