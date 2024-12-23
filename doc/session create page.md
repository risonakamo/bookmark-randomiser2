# prototype features
- [ ] navigate through bookmarks
- [ ] select folders with check, it should appear in the checkout zone
- [ ] selected folders should show number of bookmarks
- [ ] should show total bookmarks when session created
- [ ] path navigation should work

# other ideas
- since using a browser style, there's not much reason for the browser part to be so big. maybe try making it take up centre of screen with big side padding, and maybe even some top padding
- fuzzy search bar
    - look up fuzzy library
    - when displaying results, should show the entire path somewhere (maybe small and above text)
- might be useful to display number of folders and items next to each item in the browser
    - should not allow navigating into a folder that has 0 other folders, as navigating into it would just have it be empty
- how to convert the items state into derived, as it doesn't get mutated other than the change in path. but it comes from an async