#!/bin/sh

find $1 -maxdepth 1 -type f -iname "*00" | while read FILE; do
    FILENAME=${FILE%00}
    echo "Unsplitting ${FILENAME}"
    cat $FILENAME* > $FILENAME
    rm $FILENAME?*
done
