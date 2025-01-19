# prototype features
- [x] navigate through bookmarks
- [x] select folders with check, it should appear in the checkout zone
- [x] selected folders should show number of bookmarks
- [x] should show total bookmarks when session created
- [x] path navigation should work
- [ ] bookmark folder browser should show number of items/folders inside of each item to help with navigation
    - should it disable navigating into folder with 0 other folders?

# other ideas
- since using a browser style, there's not much reason for the browser part to be so big. maybe try making it take up centre of screen with big side padding, and maybe even some top padding
- fuzzy search bar
    - look up fuzzy library
    - when displaying results, should show the entire path somewhere (maybe small and above text)
- how to convert the items state into derived, as it doesn't get mutated other than the change in path. but it comes from an async