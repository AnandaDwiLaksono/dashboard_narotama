import { Player, Controls } from "@lottiefiles/react-lottie-player";
import Loader from "../assets/img/loading.json";

const LoadingAnimation = () => {
  return (
    <div className="grid place-items-center h-screen mx-auto border">
      <Player
        autoplay
        speed={1.5}
        loop
        src={Loader}
        style={{ height: "300px", width: "300px" }}>
        <Controls visible={false} />
      </Player>
    </div>
  );
};

export default LoadingAnimation;
