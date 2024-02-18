import { useAppSelector } from "../store/hooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
const GameOver = () => {
  const isGameOver = useAppSelector((state) => state.moves.isGameOver);
  const message = useAppSelector((state) => state.moves.message);

  return (
    <div className="flex h-screen flex-col items-center justify-between pb-5 pt-[13vh]">
      <Card className="rounded-lg border bg-card text-card-foreground shadow-sm w-[90vw] max-w-[400px]">
        <CardHeader>
          <CardTitle className="text-6xl font-extrabold mb-4">
            Game Over
          </CardTitle>
          <CardDescription className="text-2xl mb-8">
            The game has ended with {message}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <Button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300">
            Return
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameOver;
