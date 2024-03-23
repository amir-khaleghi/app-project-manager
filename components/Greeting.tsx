import { getUserFromCookie } from '@/lib/auth';
import { cookies } from 'next/headers';
import Button from './Button';
import Card from './Card';

/* Get Data With Cookie ------------- */
const getData = async () => {
  const user = await getUserFromCookie(cookies());
  return user;
};

// ─── Comp ─────────────────────────────────────────── 🟩 ─

const Greeting = async () => {
  /* Get Data ----------------------- */
  const user = await getData();

  // ─── Return ──────────────────────────────────────────────

  return (
    <Card className="w-full p-4  relative">
      <div className="mb-4 ">
        <h1 className="text-3xl text-gray-700 font-bold mb-4">
          Hello, {user?.firstName}!
        </h1>
        <h1 className="text-lg text-black/50">
          Check your daily tasks and schedule
        </h1>
      </div>
      <div>
        <Button
          intent="secondary"
          size="large"
        >
          Today Schedule
        </Button>
      </div>
    </Card>
  );
};

export default Greeting;
