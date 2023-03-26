import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const Dashboard = ({ user }: any) => {
  return <div>Hello {user.name}</div>;
};

export const getServerSideProps = withPageAuthRequired();

export default Dashboard;
