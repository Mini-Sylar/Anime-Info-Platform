<template>
    <div>
        <div class="tbl-header">
            <table cellpadding="0" cellspacing="0" border="0">
                <thead>
                    <tr>
                        <th>Anime Title</th>
                        <th>Latest Episode</th>
                        <th>Next Episode Air Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
            </table>
        </div>
        <div class="tbl-content">
            <table cellpadding="0" cellspacing="0" border="0">
                <tbody>
                    <tr>
                        <td>Naruto</td>
                        <td>Episode 220</td>
                        <td>N/A</td>
                        <td>Finished Airing</td>
                        <td><button>Unstar</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style scoped>
table {
    width: 100%;
    table-layout: fixed;
}

.tbl-header {
    background-color: #0195ff2c;
    backdrop-filter: blur(10px);
}

.tbl-content {
    /* height: min(700px, 70vh); */
    min-height: 100%;
    overflow-x: auto;
    margin-top: 0px;
    border: 1px solid #0195ff2c;
}

th {
    padding: 20px 15px;
    text-align: left;
    font-weight: 500;
    font-size: 12px;
    color: #fff;
    text-transform: uppercase;
}

td {
    padding: 15px;
    text-align: left;
    vertical-align: middle;
    font-weight: 300;
    font-size: 12px;
    color: #fff;
    border-bottom: solid 1px #0195ff2c;
}
</style>