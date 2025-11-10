import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useState } from 'react'
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
export default function RoomCalendar() {
    const [events, setEvents] = useState([
        { title: 'Reunião A', start: '2025-11-10T09:00:00', end: '2025-11-10T10:00:00' },
        { title: 'Treinamento', start: '2025-11-12T14:00:00', end: '2025-11-12T16:00:00' }
    ])

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
    )
}
