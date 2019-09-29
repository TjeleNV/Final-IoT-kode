 <?php

$connect = mysqli_connect("localhost", "root", "", "db1");


$query = "SELECT Overskrift, Pris, Varebeskrivelse, VareBillede FROM varetabel1 WHERE VareGruppe = ".$_GET['g'];

$result = mysqli_query($connect, $query);
while($row = mysqli_fetch_array($result)){
    echo '
        <table>
            <tr>
                <img class="tilbud" src="notif.png">
                <td class="overskrift"> '. $row["Overskrift"] .' </td>
                <td class="beskrivelse"> '. $row["Varebeskrivelse"] .' </td>
                <td class="pris"> '. $row["Pris"] .' </td>
                <td class="billede"> <img src="data:image/jpeg;base64,'.base64_encode($row['VareBillede'] ).'"  height="40" width="40" class="img-thumnail" />   </td>
            </tr>
        </table>
    ';
}
?> 