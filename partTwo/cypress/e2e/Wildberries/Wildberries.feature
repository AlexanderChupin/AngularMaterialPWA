Feature: The Wildberries

  I want to open Wildberries page

  Scenario: Opening a Wildberries network page
    Given I open Wildberries page
    Then I see "Wildberries" in the title

  Scenario: Different kind of opening
    Given I kinda open Wildberries page
    Then I am very happy

#  Scenario: Searching for the adapter
#    Given I open search for adapter
#    Then I have a search results

  Scenario: Searching for the adapter N times
    Given I open N searches for adapter
    Then I have a search results N times
