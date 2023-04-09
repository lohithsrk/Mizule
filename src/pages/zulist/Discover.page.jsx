import React, { useState, useEffect } from 'react';

import { getRandomZules } from '../../axios/zule.axios';
import { base_url } from '../../utils/constants.util';
import zuleList from '../../components/zulist/discover/ZuleList.component';

const Discover = () => {

	const [loading, setLoading] = useState(true);
	const [randomZules, setRandomZules] = useState([]);
	const [trendingZules, setTrendingZules] = useState([]);
	const [recommendedZules, setRecommendedZules] = useState([]);
	const [interestsZules, setInterestsZules] = useState([]);

	const fetchRandomZules = async (zuleOffset) => {
		// , user && user.token
		return await getRandomZules(zuleOffset).then(async (res) => {
			if (!res.data.length) return;
			const zules = res.data.map((zule) => {
				const zuleTeaser = `${base_url}/zules/${zule.id_zuleSpot}/g2pc28g0l9vgb/${zule.id_zule}-teaser.mp4`;
				const fullZule = `${base_url}/zules/${zule.id_zuleSpot}/g2pc28g0l9vgb/${zule.id_zule}-zule.mp4`;
				const zuleThumbnail = `${base_url}/zules/${zule.id_zuleSpot}/g2pc28g0l9vgb/${zule.id_zule}-thumbnail.jpg`;
				return { ...zule, zuleTeaser, fullZule, zuleThumbnail };
			});
			return zules;
		});
	};

	useEffect(() => {
		fetchRandomZules(0).then((zules) => {
			setLoading(false);
			setRandomZules(zules);
			setInterestsZules(zules);
			setRecommendedZules(zules);
			setTrendingZules(zules);
		});
	}, []);
	return <div>Discover</div>;
};

export default Discover;
