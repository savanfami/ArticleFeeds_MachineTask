import React, { Component } from 'react';




export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true
    };
  }

  componentDidCatch(error, errorInfo) {
    console.log("logging", error, errorInfo);
   
  }

  render() {
    if (this.state.hasError) {
      return <div>
        <img className='"sm:h-[300px] md:h-[690px] w-[2000px]' src="https://cdn.dribbble.com/users/1078347/screenshots/2799566/oops.png" alt="error image " />
      </div>
    }

    return this.props.children; 
  }
}
