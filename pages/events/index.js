import { Fragment } from "react";
import { useRouter } from "next/router";
import EventSearch from "../../components/events/event-search";
import { getAllEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";

export default function AllEventsPage(props) {
  const { events } = props;
  const router = useRouter();
  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}
