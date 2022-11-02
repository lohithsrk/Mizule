import { createContext, useContext, useState, useEffect } from 'react'

import { getRandomZules, getParticularZules } from '../axios/fetchZule.axios';
import { AuthContext } from '../context/auth.context';
import { base_URL } from '../utils/constants.util';
import { cacheVideo, getCachedVideo } from '../utils/cacheVideo.util';

export const ZulesContext = createContext()

export const ZulesProvider = ({ children }) => {
    const { user } = useContext(AuthContext);

    const [randomZules, setRandomZules] = useState([]);
    const [currentPlayingTeaserPath, setCurrentPlayingTeaserPath] = useState('');

    const fetchRandomZules = async (zuleOffset) => {
        getRandomZules(zuleOffset, user && user.token).then((res) => {
            if (!res.data.length) return
            const zules = res.data.map((zule) => {
                const zuleTeaser = `${base_URL}/zules/${zule.id_channel}/${user.user.user_id}/${zule.id_zule}-teaser.mp4`;
                const fullZule = `${base_URL}/zules/${zule.id_channel}/${user.user.user_id}/${zule.id_zule}-zule.mp4`;
                const zuleThumbnail = `${base_URL}/zules/${zule.id_channel}/${user.user.user_id}/${zule.id_zule}-thumbnail.jpg`;
                return { ...zule, zuleTeaser, fullZule, zuleThumbnail };
            });
            cacheVideo(zules[0].zuleTeaser, user.token);
            cacheVideo(zules[1].zuleTeaser, user.token);
            getCachedVideo(zules[0].zuleTeaser).then((res) =>
                setCurrentPlayingTeaserPath(res)
            );
            setRandomZules([...randomZules, ...zules]);
        });
    }
    const fetchParticularZule = async (zuleID, setCurrentZule) => {
        getParticularZules(zuleID, user && user.token).then((res) => {
            if (!res.data.length) return
            const zule = res.data.map((zule) => {
                const zuleTeaser = `${base_URL}/zules/${zule.id_channel}/${user.user.user_id}/${zule.id_zule}-teaser.mp4`;
                const fullZule = `${base_URL}/zules/${zule.id_channel}/${user.user.user_id}/${zule.id_zule}-zule.mp4`;
                const zuleThumbnail = `${base_URL}/zules/${zule.id_channel}/${user.user.user_id}/${zule.id_zule}-thumbnail.jpg`;
                return { ...zule, zuleTeaser, fullZule, zuleThumbnail };
            })[0]
            setCurrentZule(zule)
        });
    }



    useEffect(() => { fetchRandomZules(0) }, [])

    return <ZulesContext.Provider value={{ randomZules, fetchRandomZules, currentPlayingTeaserPath, setCurrentPlayingTeaserPath, fetchParticularZule }} >
        {children}
    </ZulesContext.Provider >
}