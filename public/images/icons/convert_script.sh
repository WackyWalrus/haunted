#!/bin/bash
x=eh

function convertfile {
	local x="${1/ico/png}"
	local x="${x/ico/png}"
	convert "$1" "$x"
}

for file in ico/*.ico
do
	convertfile $file
done
