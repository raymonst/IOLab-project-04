<?php
header('Access-Control-Allow-Origin: *');

/*  This function takes a twitter call and query and outputs an array within an array.  The internal array includes tweet "id", tweet "text"
    and tweet date "created_at"

*/
$tag=$_GET['tag'];
    
   $url = "http://gdata.youtube.com/feeds/api/videos?q=".$tag."&orderby=published";
    
    // $curl = curl_init();
    // curl_setopt( $curl, CURLOPT_URL, $url );
    // curl_setopt( $curl, CURLOPT_RETURNTRANSFER, 1 );
    // $result = curl_exec( $curl );
    // curl_close( $curl );
    // $return=(json_decode( $result, true ));
    // print_r($return);
    //echo($result);

    // for($n = 0; $n < count($return); $n++)
    // {
    //     echo($return[$n]);
    //     echo("\n");
    // }



    $sxml = simplexml_load_file($url);

    foreach ($sxml->entry as $entry) {
      // get nodes in media: namespace for media information
      $media = $entry->children('http://search.yahoo.com/mrss/');
      
      // get video player URL
      $attrs = $media->group->player->attributes();
      $watch = $attrs['url']; 
$temp=$watch;
      $str1=explode("=",$temp,2);
//echo($str1[1]."<br>");
      echo($watch."<br>");
$str2=explode("&",$str1[1],2);
echo($str2[0]."<br>");
$whole="http://www.youtube.com/embed/".$str2[0];

echo('<iframe src="'.$whole.'"width="640" height="390"></iframe>');
      
      // get video thumbnail
      $attrs = $media->group->thumbnail[0]->attributes();
      $thumbnail = $attrs['url']; 

      //get title
      $title=$media->group->title;

      //get description
      $desc=$media->group->description;
            
     //echo($title."<br>");
     //echo($watch."<br>");


    
}


echo('<iframe src="http://www.youtube.com/embed/1pSyYhRYeIM" width="640" height="390"></iframe>');
echo("something1");
?>