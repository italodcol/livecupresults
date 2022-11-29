const LIMIT = "4";
const SERVER_URL = "https://cache-wc.4yousee.com.br/";
const API_URL = `${SERVER_URL}v1/wc`;
const ENDPOINT = `${API_URL}/last?limit=${LIMIT}`;
const dateFormat = 'pt-br';


$(document).ready(function () {

    function formatDate(gameDate) {
        let weekday = gameDate.toLocaleDateString(dateFormat, { weekday: 'long' }).replace("-feira", "");
        weekday = weekday[0].toUpperCase() + weekday.slice(1);
        let day = gameDate.toLocaleDateString(dateFormat, { day: 'numeric' });
        let month = gameDate.toLocaleDateString(dateFormat, { month: 'long' });
        let date = `${weekday}, ${day} de ${month}`
        return {
            date
        }
    }

    function showGameInfo(game) {
        let gameDate = new Date(game.date);
        let { date } = formatDate(gameDate);
        let liveNow = ``;
        if (game.liveNow) {
            liveNow = `
<div class="center-item-detail">
    <div class="center-container">
        <div class="center-item-info">
            <div class="live-now">
                <span>Ao Vivo</span>
                <span class="live-game">
            </div>
        </div>
    </div>
</div>`;
        }
        const dataHTML = `
<div class="game-item">
    ${liveNow}
    <div class="game-teams">
        <div class="team home-team">
            <img src="./img/flags/${game.home.shortName.toUpperCase()}.svg" class="flag-country">
            <span class="country-name">${game.home.shortName.toUpperCase()}</span>
        </div>
        <div class="game-score">
            <span class="score score-home-team">${game.score.home}</span>
            <span class="separator">x</span>
            <span class="score score-away-team">${game.score.away}</span>
        </div>
        <div class="team away-team">
            <span class="country-name">${game.away.shortName.toUpperCase()}</span>
            <img src="./img/flags/${game.away.shortName.toUpperCase()}.svg" class="flag-country">
        </div>
    </div>
    <div class="center-item-detail">
        <div class="center-container">
            <div class="center-item-info">
                <div class="date-game">${date}</div>
            </div>
        </div>
    </div>
</div>`;
        $(".game-container").append(dataHTML);
    }

    $.ajaxSetup({
        headers: {
            'Secret-Token': "Y2MIB91VTUX885GB41CYUEG4AYSLL3"
        }
    });

    $.get(ENDPOINT, function (data) {
        let games = data.response;
        if (games) {
            games.forEach(game => {
                showGameInfo(game);
            });
        }
    });

});
