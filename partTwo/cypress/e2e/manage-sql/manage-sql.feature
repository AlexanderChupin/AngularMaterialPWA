Feature: Manage SQL
  Background: The user is authenticated
#    Given I open the to-do page
  Scenario: Displaying Manage SQL page
    When I visit the Manage SQL page
    Then I should see "SQL state" control

  Scenario: Change status of SQL
    When "SQL state" is off
    And  I click on "SQL state"
    Then "SQL state" turns on
