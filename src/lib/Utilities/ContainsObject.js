import React, { Component } from 'react';

function containsObject(obj, list) {
    for (var i = 0; i < list.length; i++) {
        if (Object.keys(list[i])[0] === Object.keys(obj)[0] )
            return true;
    }
    return false;
}

export default containsObject;