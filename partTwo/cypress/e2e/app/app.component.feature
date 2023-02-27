Feature: App
  Background: User is authenticated
    Given User opens the root page
  Scenario: Displaying server status
    When User opens the home page
    Then Server status is not disabled
    Then Server status is primary color

