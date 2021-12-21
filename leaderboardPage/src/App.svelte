<script>
    import { getLeaderboard } from './firebase.js'
    import { onMount } from 'svelte'
    let leaderboard = []
    onMount(async () => {
        let data = await getLeaderboard()

        data = data.reduce((acc, curr) => {
            if (acc[curr.level]) {
                acc[curr.level].push(curr)
            } else {
                acc[curr.level] = [curr]
            }
            return acc
        }, {})
        Object.keys(data).forEach((level) => {
            data[level].sort((a, b) => a.time - b.time)
        })
        leaderboard = Object.entries(data)
        console.log(leaderboard)
    })
    function formatS(se) {
        let m = Math.floor(se / 60)
        let s = se % 60
        return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`
    }
</script>

<div class="container">
    <h1>Cuphead: Pixel-Pressure Leaderboard</h1>
    <div class="row mt-5">
        {#each leaderboard as [level, players]}
            <div class="level col">
                <h2>Level {level}</h2>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Rank</th>
                            <th scope="col">Name</th>
                            <th scope="col">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each players as player, i}
                            <tr>
                                <td>{i + 1}</td>
                                <td>{player.name}</td>
                                <td>{formatS(player.time)}</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        {/each}
    </div>
</div>
