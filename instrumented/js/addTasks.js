function cov_2669gudym5(){var path="C:\\Users\\kiirt\\Documents\\GitHub\\Task_Manager_DevOPS_P05_Kiirthanah\\public\\js\\addTasks.js";var hash="ffc585fefae6f44163d3a967c0d3c0a313fa4d2f";var global=new Function("return this")();var gcv="__coverage__";var coverageData={path:"C:\\Users\\kiirt\\Documents\\GitHub\\Task_Manager_DevOPS_P05_Kiirthanah\\public\\js\\addTasks.js",statementMap:{"0":{start:{line:1,column:0},end:{line:1,column:34}},"1":{start:{line:5,column:4},end:{line:5,column:41}},"2":{start:{line:6,column:4},end:{line:22,column:5}},"3":{start:{line:8,column:25},end:{line:8,column:55}},"4":{start:{line:9,column:27},end:{line:9,column:48}},"5":{start:{line:11,column:25},end:{line:11,column:68}},"6":{start:{line:14,column:8},end:{line:19,column:9}},"7":{start:{line:14,column:21},end:{line:14,column:22}},"8":{start:{line:15,column:27},end:{line:15,column:59}},"9":{start:{line:16,column:12},end:{line:16,column:46}},"10":{start:{line:17,column:12},end:{line:17,column:52}},"11":{start:{line:18,column:12},end:{line:18,column:41}},"12":{start:{line:21,column:8},end:{line:21,column:58}}},fnMap:{"0":{name:"loadCategories",decl:{start:{line:4,column:15},end:{line:4,column:29}},loc:{start:{line:4,column:32},end:{line:23,column:1}},line:4}},branchMap:{},s:{"0":0,"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0},f:{"0":0},b:{},_coverageSchema:"1a1c01bbd47fc00a2c39e90264f33305004495a9",hash:"ffc585fefae6f44163d3a967c0d3c0a313fa4d2f"};var coverage=global[gcv]||(global[gcv]={});if(!coverage[path]||coverage[path].hash!==hash){coverage[path]=coverageData;}var actualCoverage=coverage[path];{// @ts-ignore
cov_2669gudym5=function(){return actualCoverage;};}return actualCoverage;}cov_2669gudym5();cov_2669gudym5().s[0]++;console.log("addTasks.js loaded");// Check if the script loads
// Function to load categories
async function loadCategories(){cov_2669gudym5().f[0]++;cov_2669gudym5().s[1]++;console.log("Loading categories...");// Check if loading categories starts
cov_2669gudym5().s[2]++;try{// Fetch the JSON file containing categories
const response=(cov_2669gudym5().s[3]++,await fetch('categories.json'));const categories=(cov_2669gudym5().s[4]++,await response.json());const dropdown=(cov_2669gudym5().s[5]++,document.getElementById('categoryDropdown'));// Dropdown menu in HTML
// Dynamically add options from categories JSON
cov_2669gudym5().s[6]++;for(let i=(cov_2669gudym5().s[7]++,0);i<categories.length;i++){const option=(cov_2669gudym5().s[8]++,document.createElement('option'));cov_2669gudym5().s[9]++;option.value=categories[i].name;// Set option value to category name
cov_2669gudym5().s[10]++;option.textContent=categories[i].name;// Display category name in dropdown
cov_2669gudym5().s[11]++;dropdown.appendChild(option);}}catch(error){cov_2669gudym5().s[12]++;console.error('Error loading categories:',error);}}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMjY2OWd1ZHltNSIsImFjdHVhbENvdmVyYWdlIiwicyIsImNvbnNvbGUiLCJsb2ciLCJsb2FkQ2F0ZWdvcmllcyIsImYiLCJyZXNwb25zZSIsImZldGNoIiwiY2F0ZWdvcmllcyIsImpzb24iLCJkcm9wZG93biIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJpIiwibGVuZ3RoIiwib3B0aW9uIiwiY3JlYXRlRWxlbWVudCIsInZhbHVlIiwibmFtZSIsInRleHRDb250ZW50IiwiYXBwZW5kQ2hpbGQiLCJlcnJvciJdLCJzb3VyY2VzIjpbImFkZFRhc2tzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnNvbGUubG9nKFwiYWRkVGFza3MuanMgbG9hZGVkXCIpOyAvLyBDaGVjayBpZiB0aGUgc2NyaXB0IGxvYWRzXHJcblxyXG4vLyBGdW5jdGlvbiB0byBsb2FkIGNhdGVnb3JpZXNcclxuYXN5bmMgZnVuY3Rpb24gbG9hZENhdGVnb3JpZXMoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkxvYWRpbmcgY2F0ZWdvcmllcy4uLlwiKTsgLy8gQ2hlY2sgaWYgbG9hZGluZyBjYXRlZ29yaWVzIHN0YXJ0c1xyXG4gICAgdHJ5IHtcclxuICAgICAgICAvLyBGZXRjaCB0aGUgSlNPTiBmaWxlIGNvbnRhaW5pbmcgY2F0ZWdvcmllc1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2NhdGVnb3JpZXMuanNvbicpO1xyXG4gICAgICAgIGNvbnN0IGNhdGVnb3JpZXMgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGRyb3Bkb3duID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhdGVnb3J5RHJvcGRvd24nKTsgLy8gRHJvcGRvd24gbWVudSBpbiBIVE1MXHJcblxyXG4gICAgICAgIC8vIER5bmFtaWNhbGx5IGFkZCBvcHRpb25zIGZyb20gY2F0ZWdvcmllcyBKU09OXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYXRlZ29yaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xyXG4gICAgICAgICAgICBvcHRpb24udmFsdWUgPSBjYXRlZ29yaWVzW2ldLm5hbWU7IC8vIFNldCBvcHRpb24gdmFsdWUgdG8gY2F0ZWdvcnkgbmFtZVxyXG4gICAgICAgICAgICBvcHRpb24udGV4dENvbnRlbnQgPSBjYXRlZ29yaWVzW2ldLm5hbWU7IC8vIERpc3BsYXkgY2F0ZWdvcnkgbmFtZSBpbiBkcm9wZG93blxyXG4gICAgICAgICAgICBkcm9wZG93bi5hcHBlbmRDaGlsZChvcHRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgbG9hZGluZyBjYXRlZ29yaWVzOicsIGVycm9yKTtcclxuICAgIH1cclxufVxyXG4iXSwibWFwcGluZ3MiOiI4bERBZVk7QUFBQUEsY0FBQSxTQUFBQSxDQUFBLFNBQUFDLGNBQUEsV0FBQUEsY0FBQSxFQUFBRCxjQUFBLEdBQUFBLGNBQUEsR0FBQUUsQ0FBQSxNQWZaQyxPQUFPLENBQUNDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFFO0FBRW5DO0FBQ0EsY0FBZSxDQUFBQyxjQUFjQSxDQUFBLENBQUcsQ0FBQUwsY0FBQSxHQUFBTSxDQUFBLE1BQUFOLGNBQUEsR0FBQUUsQ0FBQSxNQUM1QkMsT0FBTyxDQUFDQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBRTtBQUFBSixjQUFBLEdBQUFFLENBQUEsTUFDdEMsR0FBSSxDQUNBO0FBQ0EsS0FBTSxDQUFBSyxRQUFRLEVBQUFQLGNBQUEsR0FBQUUsQ0FBQSxNQUFHLEtBQU0sQ0FBQU0sS0FBSyxDQUFDLGlCQUFpQixDQUFDLEVBQy9DLEtBQU0sQ0FBQUMsVUFBVSxFQUFBVCxjQUFBLEdBQUFFLENBQUEsTUFBRyxLQUFNLENBQUFLLFFBQVEsQ0FBQ0csSUFBSSxDQUFDLENBQUMsRUFFeEMsS0FBTSxDQUFBQyxRQUFRLEVBQUFYLGNBQUEsR0FBQUUsQ0FBQSxNQUFHVSxRQUFRLENBQUNDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO0FBRTlEO0FBQUFiLGNBQUEsR0FBQUUsQ0FBQSxNQUNBLElBQUssR0FBSSxDQUFBWSxDQUFDLEVBQUFkLGNBQUEsR0FBQUUsQ0FBQSxNQUFHLENBQUMsRUFBRVksQ0FBQyxDQUFHTCxVQUFVLENBQUNNLE1BQU0sQ0FBRUQsQ0FBQyxFQUFFLENBQUUsQ0FDeEMsS0FBTSxDQUFBRSxNQUFNLEVBQUFoQixjQUFBLEdBQUFFLENBQUEsTUFBR1UsUUFBUSxDQUFDSyxhQUFhLENBQUMsUUFBUSxDQUFDLEVBQUNqQixjQUFBLEdBQUFFLENBQUEsTUFDaERjLE1BQU0sQ0FBQ0UsS0FBSyxDQUFHVCxVQUFVLENBQUNLLENBQUMsQ0FBQyxDQUFDSyxJQUFJLENBQUU7QUFBQW5CLGNBQUEsR0FBQUUsQ0FBQSxPQUNuQ2MsTUFBTSxDQUFDSSxXQUFXLENBQUdYLFVBQVUsQ0FBQ0ssQ0FBQyxDQUFDLENBQUNLLElBQUksQ0FBRTtBQUFBbkIsY0FBQSxHQUFBRSxDQUFBLE9BQ3pDUyxRQUFRLENBQUNVLFdBQVcsQ0FBQ0wsTUFBTSxDQUFDLENBQ2hDLENBQ0osQ0FBRSxNQUFPTSxLQUFLLENBQUUsQ0FBQXRCLGNBQUEsR0FBQUUsQ0FBQSxPQUNaQyxPQUFPLENBQUNtQixLQUFLLENBQUMsMkJBQTJCLENBQUVBLEtBQUssQ0FBQyxDQUNyRCxDQUNKIiwiaWdub3JlTGlzdCI6W119