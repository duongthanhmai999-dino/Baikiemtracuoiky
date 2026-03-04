import './Artist.css';
import '../Albums/Albums.css';
import { useNavigate } from 'react-router-dom';
import EminemImg from '../ImageArtist/Eminem.png';
import NavBar from '../Albums/NavBar';
import ArtistPopularTable from './ArtistPopularTable';
import WithoutMe from '../ImageArtist/WithoutMe.png';
import mockingbird from '../ImageArtist/mockingbird.png';
import TheRealSlimSha from '../ImageArtist/TheRealSlimSha...png';
import LoseYourself from '../ImageArtist/LoseYourself.png';
import Godzila from '../ImageArtist/Godzila.png';

const Artist = () => {
    const navigate = useNavigate();
    const popularSongs = [
        { image: WithoutMe, title: 'Without Me', artist: 'Eminem', release: 'May 15, 2002', played: '21,215,618', duration: '4:50' },
        { image: mockingbird, title: 'mockingbird', artist: 'Eminem', release: 'Apr 25, 2005', played: '19,856,112', duration: '4:10' },
        { image: TheRealSlimSha, title: 'The Real Slim Sha..', artist: 'Eminem', release: 'May 23, 2000', played: '18,234,567', duration: '4:44' },
        { image: LoseYourself, title: 'Lose Yourself', artist: 'Eminem', release: 'Oct 28, 2002', played: '16,543,210', duration: '5:26' },
        { image: Godzila, title: 'Godzilla', artist: 'Eminem', release: 'Nov 30, 2023', played: '15,123,456', duration: '3:30' },
    ];

    return (
        <div className="app artist-page">
            <div className="app-content">
                <div className="artist-card-wrap">
                    <div className="artist-img-wrap">
                        <img src={EminemImg} alt="Eminem" className="artist-img" />
                    </div>
                    <div className="artist-nav-bar">
                        <NavBar onBack={() => navigate(-1)} />
                    </div>
                    <ArtistPopularTable songs={popularSongs} />
                    <h2 className="artist-albums-title">
                        Artist's <span className="artist-albums-accent">Albums</span>
                    </h2>
                </div>
            </div>
        </div>
    );
}
export default Artist;