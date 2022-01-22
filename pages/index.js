import FpqHead from '../src/components/_head';
import MusicList from '../src/containers/music-list';

export default function Home() {
  return (
    <div className="_home">
      <FpqHead />
      <main className="main" id="main-wrap">
        <MusicList />
      </main>
    </div>
  )
}
