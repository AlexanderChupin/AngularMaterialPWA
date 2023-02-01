Feature: Manage SQL
  Background: The user is authenticated
#    Given I open the to-do page
  Scenario: Displaying Manage SQL page
    When I visit the Manage SQL page
    Then I should see "SQL state" control
    Then gwEndpoint should be called with the correct response
    Then I should see connection success

  Scenario: Displaying GW error
    # When I visit the Manage SQL page
    When GW is not responding
    Then gwEndpoint should be called with the error response
    #Then I should see connection error
#  Scenario: Change status of SQL
#    When "SQL state" is off
#    And  I click on "SQL state"
#    Then "SQL state" turns on
