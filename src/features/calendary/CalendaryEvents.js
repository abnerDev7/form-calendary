'use client';

import ModalWindow from '@/components/ModalWindow';
import {
  addEvent,
  getEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} from '@/services/apiBigCalendar';
import { Radio, Button } from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { momentLocalizer } from 'react-big-calendar';
import { Calendar } from 'react-big-calendar';
import styled from 'styled-components';

const localizer = momentLocalizer(moment);
moment.locale();

const Input = styled.input`
  padding: 0.5rem;
  margin: 0 2rem;
  border-radius: 7px;
  border: 1px solid #ced4da;
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  margin: 0 2rem;
  border-radius: 7px;
  border: 1px solid #ced4da;
  resize: none;
  height: 80px;
  width: 100%;
`;

const NewEvent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

const CalendarStyled = styled(Calendar)`
  background-color: #f8f9fa;
  font-size: 'Roboto';

  .rbc-calendar {
    box-sizing: border-box;
  }

  .rbc-toolbar {
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }

  .rbc-toolbar button {
    background: none;
    border: 1px solid #ddd;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 7px;
  }

  .rbc-toolbar button:hover {
    color: #fff;
    background: #74c0fc;
  }

  .rbc-btn-group button.rbc-active {
    background-color: #1864ab !important;
    color: white !important;
    border-color: #1864ab !important;
    font-weight: 700 !important;
  }

  .rbc-toolbar-label {
    font-size: 24px;
    font-weight: 700;
    color: #1864ab;
  }

  .rbc-today {
    background-color: #f8f8f8;
  }

  .rbc-day-bg {
    border-right: 1px solid #ddd;
  }

  .rbc-off-range {
    color: #ccc;
  }

  .rbc-event-label {
    display: none;
  }

  .rbc-time-view .rbc-event {
    border: none;
  }
`;

const ChooseColorEvent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const colorsEvents = {
  a: '#5c940d',
  b: '#d9480f',
  c: '#f06595',
  d: '#a61e4d',
  e: '#1864ab',
};

function CalendaryEvents() {
  const [events, setEvents] = useState([]);
  const [nameEvent, setNameEvent] = useState('');
  const [descriptionEvent, setDescriptionEvent] = useState('');
  const [open, setOpen] = useState(false);
  const [eventCurrent, setEventCurrent] = useState({});
  const [newProperty, setNewProperty] = useState(true);
  const [selectedValue, setSelectedValue] = useState('a');
  const [currentEventApi, setCurrentEventApi] = useState(null);

  useEffect(() => {
    const getEventsApi = async () => {
      const events = await getEvents();
      const formattedEvents = events.map((event) => ({
        id: event.id,
        title: event.title,
        start: new Date(event.eventAt),
        end: new Date(event.eventAt),
        color: event.color,
      }));

      setEvents(formattedEvents);
    };

    getEventsApi();
  }, [newProperty]);

  const handleSelectSlot = (event) => {
    setOpen(true);
    setEventCurrent(event);
  };

  const handleAccept = async () => {
    try {
      const title = nameEvent;
      const description = descriptionEvent;
      const { start, end } = eventCurrent;

      if (!title || !start) return;

      const newEvent = {
        eventAt: start,
        title,
        description,
        color: colorsEvents[selectedValue],
      };

      await addEvent(newEvent);

      setOpen(false);
      setNameEvent('');
      setDescriptionEvent('');
      setSelectedValue('a');
      setEventCurrent({});
      setNewProperty((property) => !property);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedEvent = {
        eventAt: eventCurrent.start,
        title: nameEvent,
        description: descriptionEvent,
        color: colorsEvents[selectedValue],
      };

      await updateEvent(eventCurrent.id, updatedEvent);
      setOpen(false);
      setNewProperty((property) => !property);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteEvent(eventCurrent.id);
      setOpen(false);
      setNewProperty((property) => !property);
    } catch (error) {
      console.log(error);
    }
  };

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: event?.color || colorsEvents.d,
        color: 'white',
        borderRadius: '5px',
        padding: '5px',
      },
    };
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleGetEvent = async (ev) => {
    try {
      const event = await getEvent(ev?.id);
      setCurrentEventApi(event);
      setEventCurrent(event);
      setNameEvent(event.title);
      setDescriptionEvent(event.description || '');
      setOpen(true);

      setSelectedValue(
        Object.entries(colorsEvents).find(([k, v]) => v === event.color)?.[0]
      );
    } catch (error) {
      console.log(error);
    }
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  return (
    <div>
      <CalendarStyled
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600, fontFamily: '' }}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleGetEvent}
        eventPropGetter={eventStyleGetter}
        selectable
      />
      <ModalWindow
        open={open}
        handleClose={() => {
          setOpen(false);
          setNameEvent('');
          setDescriptionEvent('');
          setSelectedValue('a');
          setEventCurrent({});
        }}
        btnAccept={!eventCurrent.id && handleAccept}
      >
        <NewEvent>
          <h2>{eventCurrent.id ? 'Edit Event' : 'New Event'}</h2>
          {eventCurrent.id ? (
            <>
              <strong>Title event</strong>
              <Input
                type="text"
                value={nameEvent}
                onChange={(e) => setNameEvent(e.target.value)} // Update the title when typed
              />
              {/* Editable Input for Event Description */}

              <strong>Description</strong>
              <Input
                value={descriptionEvent}
                onChange={(e) => setDescriptionEvent(e.target.value)} // Update the description when typed
                placeholder="Enter event description..."
              />
              <p>
                <strong>Event Date:</strong>{' '}
                {moment(currentEventApi?.eventAt).format(
                  'MMMM Do YYYY, h:mm:ss a'
                )}
              </p>
              {/* You can add more event details here */}
            </>
          ) : (
            <div>
              <p>Introduce name of your event</p>
              <Input
                value={nameEvent}
                onChange={(e) => setNameEvent(e.target.value)}
              />
            </div>
          )}
          <ChooseColorEvent>
            <Radio
              {...controlProps('a')}
              sx={{
                color: '#5c940d',
                '&.Mui-checked': {
                  color: '#5c940d',
                },
              }}
            />
            <Radio
              {...controlProps('b')}
              sx={{
                color: '#d9480f',
                '&.Mui-checked': {
                  color: '#d9480f',
                },
              }}
            />
            <Radio
              {...controlProps('c')}
              sx={{
                color: '#f06595',
                '&.Mui-checked': {
                  color: '#f06595',
                },
              }}
            />
            <Radio
              {...controlProps('d')}
              sx={{
                color: '#862e9c',
                '&.Mui-checked': {
                  color: '#862e9c',
                },
              }}
            />
            <Radio
              {...controlProps('e')}
              sx={{
                color: '#364fc7',
                '&.Mui-checked': {
                  color: '#364fc7',
                },
              }}
            />
          </ChooseColorEvent>
          {eventCurrent.id && (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdate}
              >
                Update Event
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleDelete}
              >
                Delete Event
              </Button>
            </>
          )}
        </NewEvent>
      </ModalWindow>
    </div>
  );
}

export default CalendaryEvents;
