import { Player, Controls } from "@lottiefiles/react-lottie-player";
import Error from "../assets/img/error.json";

const ErrorAnimation = () => {
  return (
    <div className="grid place-items-center h-screen mx-auto border">
      <Player
        autoplay
        speed={1.5}
        loop
        src={Error}
        style={{ height: "300px", width: "300px" }}>
        <Controls visible={false} />
      </Player>
    </div>
  );
};

export default ErrorAnimation;
