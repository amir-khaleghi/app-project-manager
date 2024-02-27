import Card from '@/components/Card';

export default function HomePageLoader() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <Card className="p-4">
        {/* <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-black"></div> */}
        <div className="loader"></div>
      </Card>
    </div>
  );
}
