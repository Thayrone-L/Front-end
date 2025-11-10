import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState, useEffect } from 'react';
import ptBrLocale from "@fullcalendar/core/locales/pt-br";

export default function RoomCalendar({ selectedSala }) {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        if (!selectedSala) {
            setEvents([]);
            return;
        }

        const fetchEvents = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`https://localhost:7181/api/Reservation/by-room/${selectedSala.id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!res.ok) throw new Error("Erro ao buscar reservas da sala");

                const data = await res.json();
                const calendarEvents = data.map(r => ({
                    id: r.id,
                    title: r.responsible + (r.coffeeRequested ? " Sim" : ""),
                    start: r.start,
                    end: r.end,
                }));

                setEvents(calendarEvents);
            } catch (err) {
                console.error(err);
                setEvents([]);
            }
        };

        fetchEvents();
    }, [selectedSala]);

    return (
        <div style={{ width: '100%', height: '80vh', padding: '1rem' }}>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                locales={[ptBrLocale]}
                locale="pt-br"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                allDaySlot={false}
                slotMinTime="08:00:00"
                slotMaxTime="22:00:00"
                events={events}
                editable={false}
                selectable={true}
                selectMirror={true}
                height="100%"
            />
        </div>
    );
}
