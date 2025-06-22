"use client";
import { useState } from 'react';
import MatchSearch from '@/app/components/MatchSearch';
import MatchTable from '@/app/components/MatchTable';

export default function Page() {
	const [matchId, setMatchId] = useState('');

	console.log(matchId)
	return (
		<div>
			<MatchSearch matchId={matchId} setMatchId={setMatchId} />
			{matchId === '' ? '' : <MatchTable matchId={matchId} />}
		</div>
	)
}

