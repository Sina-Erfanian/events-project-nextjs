import { useRouter } from "next/router";
import { getFilteredEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";

export default function FilteredEventPage(props) {
  const router = useRouter();

  // const filteredData = router.query.slug;

  // if (!filteredData) {
  //   return <p className="center">Loading ... 💫</p>;
  // }

  // const filteredYear = filteredData[0];
  // const filteredMonth = filteredData[1];

  // const numYear = +filteredYear;
  // const numMonth = +filteredMonth;

  // if (
  //   isNaN(numYear) ||
  //   isNaN(numMonth) ||
  //   numYear > 2030 ||
  //   numYear < 2021 ||
  //   numMonth < 1 ||
  //   numMonth > 12
  // ) {
  //   return <p>Invalid Filter. Please Adjust Your Values!</p>;
  // }

  const filteredEvents = props.events;
  if (!filteredEvents || filteredEvents.length === 0) {
    return <p>No events found for the chosen filter!</p>;
  }

  return (
    <div>
      <EventList items={filteredEvents} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;

  const filteredData = params.slug;

  const filteredYear = filteredData[0];
  const filteredMonth = filteredData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      notFound: true,
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      events: filteredEvents,
    },
  };
}
