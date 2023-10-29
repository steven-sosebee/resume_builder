<?php
// Use in the “Post-Receive URLs” section of your GitHub repo.
// input the application's home folder
$folder = "public_html/resume-builder";
echo 'Running the file...';
if ( $_POST['payload'] ) {
   echo "Executing the shell script...";
   shell_exec("cd ~/$folder && git pull origin gh-pages");
}

echo "Finished...";
?>