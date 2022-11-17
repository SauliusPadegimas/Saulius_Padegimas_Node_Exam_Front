import video from '../img/video.mp4';

function Login() {
  return (
    <div className='login-hero'>
      <div className='bg-video'>
        <video className='bg-video__content' autoPlay muted loop>
          <source src={video} type='video/mp4' />
          Your browser is not supported to play this video!
        </video>
      </div>
      Login or register
    </div>
  );
}

export default Login;
