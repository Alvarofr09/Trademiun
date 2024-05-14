import { useEffect, useState } from "react";
import TopTwo from "./TopTwo";
import TopOne from "./TopOne";
import TopThree from "./TopThree";

export default function Podium({ podium, seguidores }) {
	const [topOne, setTopOne] = useState(null);
	const [topTwo, setTopTwo] = useState(null);
	const [topThree, setTopThree] = useState(null);

	useEffect(() => {
		podium.forEach((user, index) => {
			if (index === 0) setTopOne(user);
			if (index === 1) setTopTwo(user);
			if (index === 2) setTopThree(user);
		});
	}, [podium]);
	return (
		<>
			{topTwo && <TopTwo user={topTwo} seguidores={seguidores} />}
			{topOne && <TopOne user={topOne} seguidores={seguidores} />}
			{topThree && <TopThree user={topThree} seguidores={seguidores} />}
		</>
	);
}
