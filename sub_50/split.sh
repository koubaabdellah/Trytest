i=0; for f in *; do 
    d=picture_$(printf %03d 
    $((i/2000+1))); mkdir -p $d; mv 
    "$f" $d; let i++;
done
