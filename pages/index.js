import FpqHead from '../src/components/_head';
import MusicList from '../src/containers/music-list';
import ArtistPopup from '../src/components/_artist-popup';
import MediaPopup from '../src/components/_media-popup';

export default function Home() {
  return (
    <div className="_home">
      <FpqHead />
      <main className="main" id="main-wrap">
        <MusicList />
        <ArtistPopup />
        <MediaPopup />
      </main>
    </div>
  )
}
