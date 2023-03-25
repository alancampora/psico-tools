import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const Dashboard = ({ user }) => {
  return <div>Hello {user.name}</div>;
};

export const getServerSideProps = withPageAuthRequired();

export default Dashboard;
