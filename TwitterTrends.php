 <?php
 header('Access-Control-Allow-Origin: *');



 //$trends_url = "http://search.twitter.com/trends/daily.json";
$trends_url = "http://api.twitter.com/1/trends/daily.json";
// initialise the session
$ch = curl_init();

// Set the URL
curl_setopt($ch, CURLOPT_URL, $trends_url);

// Return the output from the cURL session rather than displaying in the browser.
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

//Execute the session, returning the results to $curlout, and close.
$curlout = curl_exec($ch);
curl_close($ch);

$response = json_decode($curlout, true);


//CODE TO ACCESS ALL TOPICS FROM ALL HOURS
//PUTTING EVERYTHING IN SINGLE ARRAY
$i=0;

$topics=array();
foreach(array_keys($response['trends']) as $hours)
{
	for($c=0; $c < 20; $c++)
	{
		$topics[$i]=$response['trends'][$hours][$c]['name'];
		$i=$i+1;

	}
}

//print_r($topics);


//GETTING TWEETS FOR TOP 10 TOPICS

for($t=0;$t<10;$t++)
{
	$topic=$topics[$t];

	echo("<h2>".$topic."</h2><br>");
//TAKING 10 TWEETS OF THE TOPIC
	$url = "http://search.twitter.com/search.json?q=" . urlencode( $topic ) . "&exclude:retweets&lang=en&rpp=10&result_type=recent";

	$curl = curl_init();
		curl_setopt( $curl, CURLOPT_URL, $url );
		curl_setopt( $curl, CURLOPT_RETURNTRANSFER, 1 );
		$result = curl_exec( $curl );
		curl_close( $curl );
		$return = json_decode( $result, true );

		//var_dump($return);

		for($n = 0; $n < count($return["results"]); $n++)
		{
			
			
			echo( $return["results"][$n]["text"]."<br>");
			
		}	
	


}





?>