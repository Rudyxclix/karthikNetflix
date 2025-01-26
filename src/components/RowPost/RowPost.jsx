import React, { useEffect, useState } from 'react'
import './RowPost.css'
import axios from '../../axios'
import { imageUrl } from '../../Constance/constance'
import YouTube from 'react-youtube'

const RowPost = (props) => {

    const [urlId, setUrlId] = useState('')
    const [movies, setMovies] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        axios.get(props.url).then((response) => {
            console.log(response.data);
            setMovies(response.data.results)
        })
    }, [])

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    const handleMovieClick = (id) => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=2b5ce70b0c3667205deb98d431030377`).then((response) => {
            console.log(response.data.results);
            if (response.data.results.length != 0) {
                setUrlId(response.data.results[0])
                setIsModalOpen(true)
            } else {
                console.log('Array Empty');

            }
        })
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setUrlId("")
    };

    return (
        <div className='row'>
            <h2>{props.title}</h2>
            <div className='posters'>
                {
                    movies?.map((obj) => (
                        <img onClick={() => handleMovieClick(obj.id)} key={obj.id} className={props.isSmall ? 'smallPoster' : 'poster'} src={props.isBackDrop ? `${imageUrl + obj?.backdrop_path}` : `${imageUrl + obj?.poster_path}`} alt="poster" />
                    ))
                }
            </div>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={closeModal}>
                            &times;
                        </span>
                        <YouTube opts={opts} videoId={urlId.key} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default RowPost