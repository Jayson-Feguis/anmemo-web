import moment from "moment";
export const columns = [
  {
    title: "Announcement Title",
    width: 30,
    dataIndex: "ANNOUNCEMENT_TITLE",
    key: "ANNOUNCEMENT_TITLE",
    render: (announcement_title) => (
      <a
        href={
          process.env.REACT_APP_DOCUMENT_STATIC_ENDPOINT + announcement_title
        }
        target="_blank"
        rel="noreferrer"
      >
        {announcement_title}
      </a>
    ),
  },
  {
    title: "Sender",
    width: 30,
    dataIndex: "SENDER_NAME",
    key: "SENDER_NAME",
  },
  {
    title: "Date Sent",
    dataIndex: "SEND_DATETIME",
    key: "SEND_DATETIME",
    width: 30,
    render: (date) => <p>{moment(date).format("MMMM DD, YYYY hh:mm A")}</p>,
  },
];
