import { useState } from 'react';

const MatchSearch = ({ matchId, setMatchId }: { matchId: string; setMatchId: any; }) => {
	const [inputValue, setInputValue] = useState('')

	const handleClick = () => {
		setMatchId(inputValue)
	}

	return (
		<div>
			<input
				type="text"
				value={inputValue}
				onChange={(e) => { setInputValue(e.target.value) }}
			/>
			<button className="cursor-pointer" type="submit" onClick={handleClick}>Search</button>
		</div>
	)
}
export default MatchSearch;
