const API_CALENDAR = `https://6499e50479fbe9bcf8402476.mockapi.io/eventos`;

export const getEvents = async () => {
  try {
    const res = await fetch(API_CALENDAR);
    const data = await res.json();

    return data;
  } catch (error) {
    console.error('Error trying to get events 🔥');
    throw new Error('Error fetching events: ', error.message);
  }
};

export const getEvent = async (id) => {
  try {
    const res = await fetch(`${API_CALENDAR}/${id}`);
    const data = await res.json();

    return data;
  } catch (error) {
    console.error('Error trying to get event 🔥');
    throw new Error('Error fetching event: ', error.message);
  }
};

export const addEvent = async (event) => {
  try {
    const res = await fetch(API_CALENDAR, {
      method: 'POST',
      body: JSON.stringify(event),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('Failed to add event');
    }
  } catch (error) {
    console.error('Error trying to add event 🔥');
    throw new Error('Error adding event: ', error.message);
  }
};

export const updateEvent = async (id, updatedEvent) => {
  try {
    const res = await fetch(`${API_CALENDAR}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedEvent),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('Failed to update event');
    }

    return await res.json(); // Return the updated event
  } catch (error) {
    console.error('Error trying to update event 🔥');
    throw new Error('Error updating event: ', error.message);
  }
};

export const deleteEvent = async (id) => {
  try {
    const res = await fetch(`${API_CALENDAR}/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error('Failed to delete event');
    }

    return await res.json(); // Return the deleted event's data if needed
  } catch (error) {
    console.error('Error trying to delete event 🔥');
    throw new Error('Error deleting event: ', error.message);
  }
};
