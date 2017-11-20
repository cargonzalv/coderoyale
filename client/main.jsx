import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
 
import Nav from '../imports/ui/components/Nav.jsx';
 
Meteor.startup(() => {
  render(<Nav />, document.getElementById("header-target"));
});