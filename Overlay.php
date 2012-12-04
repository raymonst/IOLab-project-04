<!DOCTYPE html>
<html lang="en">
	<head>
		<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
		<title>Overlay</title>

        <!-- Google-hosted jQuery -->
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
        <!-- Google-hosted jQuery UI -->
        <!--<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.23/jquery-ui.min.js"></script>-->

                <script src="js/bootstrap.min.js"></script>

    <link href="css/bootstrap.min.css" rel="stylesheet" media="screen">
		<style type="text/css">
  
  .modal-backdrop.fade.in {
opacity: .5;
  }


		</style>

		
	</head>
<body>

<?php
header('Access-Control-Allow-Origin: *');

$tag=$_GET['tag'];
    
    //GETTING 2ND MOST RECENT VIDEO SINCE 1ST VIDEOS ARE GENERALLY ADS
   $url = "http://gdata.youtube.com/feeds/api/videos?q=".$tag." &start-index=2&max-results=1&orderby=viewCount";
    

    $sxml = simplexml_load_file($url);

    $entry=$sxml->entry;
      // get nodes in media: namespace for media information
      $media = $entry->children('http://search.yahoo.com/mrss/');
      
      // get video player URL
      $attrs = $media->group->player->attributes();
      $watch = $attrs['url']; 
$temp=$watch;
      $str1=explode("=",$temp,2);

//GETTING THE VIDEO-ID PART OF URL
$str2=explode("&",$str1[1],2);

$whole="http://www.youtube.com/embed/".$str2[0];

?>

<!-- Button to trigger modal -->
<a href="#myModalWin" role="button" class="btn" data-toggle="modal">Launch demo modal</a>
<a href="#myModalLose" role="button" class="btn" data-toggle="modal">Launch demo modal</a>
<a href="#myModalShowAnswer" role="button" class="btn" data-toggle="modal">Launch demo modal</a>

 

<!-- Modal -->
<div id="myModalWin" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
    <h3 id="myModalLabel">Congratulations!</h3>
  </div>
  <div class="modal-body">
    <p>You won! <br><br>You deserve a break. Enjoy this popular YouTube video on <b><?php echo($tag);?>.</b></p><br>
    <?php 
echo('<iframe src="'.$whole.'"width="520" height="300"></iframe>');
    ?>
  </div>
  <div class="modal-footer">
    <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
    <button class="btn btn-primary">No Thanks. Play Next Game.</button>
  </div>
</div>

<!-- Modal -->
<div id="myModalLose" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
    <h3 id="myModalLabel">Life is hard!</h3>
  </div>
  <div class="modal-body">
    <p>The correct answer is <b> <?php echo($tag);?>.</b> <br><br>No worries. Enjoy this popular YouTube video on <b><?php echo($tag);?>.</b></p>
    <?php 
echo('<iframe src="'.$whole.'"width="520" height="300"></iframe>');
    ?>
  </div>
  <div class="modal-footer">
    <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
    <button class="btn btn-primary">No Thanks. Play Next Game.</button>
  </div>
</div>

<!-- Modal -->
<div id="myModalShowAnswer" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
    <h3 id="myModalLabel">Give up?</h3>
  </div>
  <div class="modal-body">
    <p>The correct answer is <b> <?php echo($tag);?>.</b> <br><br>Refresh yourself before you try again. Enjoy this popular YouTube video on <b><?php echo($tag);?>.</b></p>
    <?php 
echo('<iframe src="'.$whole.'"width="520" height="300"></iframe>');
    ?>
  </div>
  <div class="modal-footer">
    <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
    <button class="btn btn-primary">No Thanks. Play Next Game.</button>
  </div>
</div>
    
</body>
</html>