import React from 'react';


//object destructuring, access the props drilled from parent, dashboard
const Reminders = ({currentTemp,
                    currentAQI,
                    currentWindSpeed,
                    reminders
                  }) => {
                    //declare dictionary to refer database string to variables
                    const dictionary = {
                      'windspeed': currentWindSpeed,
                      'temperature': currentTemp,
                      'AQI': currentAQI
                    }
                    
                    //declare empty array to store each reminder post processing
                    const reminderList = [];

                    //loop through favorites and evaluate the variables and conditions based on current environmental conditions
                    //sample input
                    //[{1,3, temperature, greater, 80, hot}]
                    //[{id, type, condition, value, message}]
                    for (let i = 0; i < reminders.length; i++){
                      const currentRule = reminders[i];

                      //conditional statement to handle greater than cases
                      if(currentRule.condition === 'greater'){
                        if(dictionary[currentRule.type] > currentRule.value) {
                          reminderList.push(<p>message={currentRule.message}</p>);
                        }
                      }
                      
                      //conditional statement to handle less than cases
                      if(currentRule.condition === 'less'){
                        if(dictionary[currentRule.type] < currentRule.value) {
                          reminderList.push(<p>message=currentRule.message</p>);
                        }
                      }

                      //conditional statement to handle equal to cases
                      if(currentRule.condition === 'equal'){
                        if(dictionary[currentRule.type] === currentRule.value) {
                          reminderList.push(<p>message=currentRule.message</p>);
                        }
                      }
                    }

                    return {reminderList};
                  }
                

export default Reminders;