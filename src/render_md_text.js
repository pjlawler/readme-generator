
// Dynamically creates the table of contents depending on which sections have data
function renderTableOfContents(data) {

  // returns the link for the section
  const link_url = (section) => {
    switch(section) {
      case 'Description': return '#description'
      case 'Usage Information': return '#usage-information'
      case 'Installation Instructions': return '#installation-instructions'
      case 'Tests': return '#tests'
      case 'Contributing': return '#contributing'
      case 'Questions': return '#questions'
      case 'License Info': return '#license-info'
      default: return '#error'
    }
  }
  
  // Creates the intial array for the table of contents
  let toc_array = ['Description'];
  
  // Adds optional sections to the array if there is data present in the respective section
  if (data.usage) { toc_array.push('Usage Information');};
  if (data.installation) { toc_array.push('Installation Instructions');};
  if (data.tests) { toc_array.push('Tests')}
  if (data.hasCollaborators) { toc_array.push('Contributing');};
  toc_array.push('Questions');
  if (data.license !== 'none') {toc_array.push('License Info');};

  // constructs the string of the table of contents
  let toc = `## *Table of Contents*
`;
  toc_array.forEach((item, index) => {
    toc += `${index + 1 }. [${item}](${link_url(item)})
`});
  return toc;
};

// These render the sections if there's data present, if not, the function will return an empty string so it doesn't render anything undefined 
function renderScreenShot(imgUrl) {
  if (imgUrl === 'none') { return ''; }
  return `![Screen Shot](${imgUrl})`
};
function renderContributing (data) {
  // will return the additonal collaborators that were entered from the cli, if any
  if(!data.hasCollaborators) {return ""}
  let line = `## *Contributing*
  `
  // constructs the string to hold the list of collaborators and their github addresses
  data.collaborators.forEach(col => { 
    line += `- ${col.name} [github](https://github.com/${col.github})
  `
  });
  line += `- - -`
  return line;
};
function renderTests(tests) {
  // returns the additional credits entered from the cli, if any
  if(!tests) {return ""}
  return `## *Tests*
  ${tests}
  - - -`
};
function renderInstallation(installation) {
  // returns the installation instructions that was entered in the cli, if any exists
  if(!installation) {return ""}
  return `## *Installation Instructions*
  ${installation}
  - - -`
};
function renderUsage(usage) {
  // returns the usage instructions text that was entered from the cli, if there is any
  if(!usage) {return ""}
  return `## *Usage Information*
  ${usage}
  - - -`
};
function renderLicenseBadge(license) {
    switch(license) {
      case 'mit': return '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
      case 'apache': return '[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
      case 'gplv2': return '[![License: GPL v2](https://img.shields.io/badge/License-GPL_v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)';
      case 'gplv3': return '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)';
      case 'bsd 2-clause': return '[![License](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)';
      case 'bsd 3-clause': return '[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)';
      default: return ""
    }
};
function renderLicenseSection(data) {
  // if no  selected in the license, it will return an empty string
  if(data.license === 'none') { return "" }

  // Actual text for each license
  const mit_text = (name) => {
    return `Copyright ${'\u24b8'} ${new Date().getFullYear()} ${name}
      
    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`
  }
  const gnu2_text = (name) => {
    return `Copyright ${'\u24b8'} ${new Date().getFullYear()} ${name}
    
    This program is free software; you can redistribute it and/or modify it under
    the terms of the GNU General Public License as published by the
    Free Software Foundation; either version 2 of the License,
    or (at your option) any later version.
    
    This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
    without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
    See the GNU General Public License for more details.
    
    You should have received a copy of the GNU General Public License along with this program;
    if not, write to the Free Software Foundation, Inc., 
    59 Temple Place, Suite 330, Boston, MA 02111-1307 USA`
  }
  const gnu3_text = (name) => {
    return `Copyright ${'\u24b8'} ${new Date().getFullYear()} ${name}
    
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    
    You should have received a copy of the GNU General Public License
    along with this program. If not, see <https://www.gnu.org/licenses/>.`
  }
  const apache_text = (name) => {
  
    return `Copyright ${'\u24b8'} ${new Date().getFullYear()} ${name}
    
    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
    
    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.`
  }
  const bsd2_text = (name) => {
    
    return `Copyright ${'\u24b8'} ${new Date().getFullYear()} ${name}
    
    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions are met:
    
    1. Redistributions of source code must retain the above copyright notice,
    this list of conditions and the following disclaimer.
    
    2. Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.
    
    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
    AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE 
    IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
    DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
    ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
    (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
    LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
    ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
    (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
    SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.`
  }
  const bsd3_text = (name) => {
    
    return `Copyright ${'\u24b8'} ${new Date().getFullYear()} ${name}
    
    Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
    
    1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
    2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
    3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
    
    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
    `
  }

  // gets the specific license text and markdown badge of the chosen license from the cli,
  // if 'custom' was selected then returns the license text that was entered from the cli
  const text = () => {
    switch(data.license) {
      case 'mit': return mit_text(data.author);
      case 'apache': return apache_text(data.author);
      case 'gplv2': return gnu2_text(data.author);
      case 'gplv3': return gnu3_text(data.author);
      case 'bsd 2-clause': return bsd2_text(data.author);
      case 'bsd 3-clause': return bsd3_text(data.author);
      case 'custom': return data.license_text;
      default: return ""
    }
  }

// constructs the string for the license to be displayed in the readme string
  return `## *License Info*
  ${renderLicenseBadge(data.license)}  ${text()}`
};

// constructs the final markdown string to be used when writing the README.md file
function generateMarkdown(data) { 
 return`
 ${renderLicenseBadge(data.license)}
 # ${data.title}
 ${renderTableOfContents(data)}
 _ _ _
 ## *Description*
 ### ${data.description} 
 ${renderScreenShot(data.screenshot)}
 _ _ _
 ${renderUsage(data.usage)}
 ${renderInstallation(data.installation)}
 ${renderTests(data.tests)}
 ${renderContributing(data)}
 ## *Questions*
 ###   For questions or comments concerning this project please contact, ${data.author}, the author, owner and manager the work via either github or email. Links for each are listed below.
 - [github](https://github.com/${data.github}) ${data.github}
 - ${data.email}
 _ _ _
 ${renderLicenseSection(data)}`
};

module.exports = generateMarkdown;