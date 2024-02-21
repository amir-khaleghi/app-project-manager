import Button from '@/components/Button';
import Card from '@/components/Card';
import Input from '@/components/Input';
import Image from 'next/image';
import union from '@/assets/union.webp';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4">
      Home
      <Button
        intent="primary"
        size="large"
      >
        test
      </Button>
      <Input
        className=" w-80"
        placeholder="test"
      />
      <Card className=" items-center justify-center flex flex-col gap-4 ">
        Hello
        <Image
          className="w-20  hover:cursor-pointer"
          alt="union"
          src={union}
        />
      </Card>
    </div>
  );
};
export default Home;
