# About this map
This is a map that was designed to address the issues of a [previous iteration](https://amti.csis.org/carto/claims/?u=csis&t=multilayer_claims_copy&v=0d8d4808-33c7-11e6-b50b-0e31c9be1b51).

# How this map works

## Data Prep
[The data](https://github.com/CSIS-iLab/AMTImaps/tree/master/excel) obtained from the program was first imported into Carto. Carto returns a SHP file that can be uploaded Mapbox as a data-source.

## Styling
The functioning of this map depends significantly on Mapbox studio. A new layer is created for each claimant(country) with a unique color. Correspondingly, all types of claims have a unique styling property (such as stroke-dasharray) that is overlaid on country lines.  The process of creating a new claim/claimant described below.

### To create a new type of Claim
1. Create a new layer
2. For source, select the file that you uploaded (SHP file). All layers will have this same dataset.
3. For type, select line. 
4. Next, click add filter. Follow the below instructions exactly because order is important. 
5. Filter on 'country' > 'is not any of' > Add filter value 'Mexico' > Add filter value 'Panama'
6. Filter on 'type' > 'is any of' > *'TYPE OF CLAIM YOU WANT TO ADD'*
7. Switch to the 'Style' tab. Style the claim line as you wish. 
8. Add a width function with zoom as a variable. Zoom 4 Width 2px -> Zoom 22 Width 8px

### To create a new Claimant
1. Create a new layer
2. For source, select the file that you uploaded (SHP file). All layers will have this same dataset.
3. For type, select line. 
4. Next, click add filter. Follow the below instructions exactly because order is important. 
5. Filter on 'country' > 'is any of' > *'NAME OF CLAIMANT YOU WANT TO ADD'*
6. Filter on 'type' > 'is any of' > *Each type of Claim that exists for that country such as "Territorial Baseline", "Continental Shelf"*
7. Switch to the 'Style' tab. Give the country lines a color that distinguishes itself from its neighbors. 
8. Add a width function with zoom as a variable. Zoom 4 Width 2px -> Zoom 22 Width 8px

Please note that Mapbox Styles seems to take a while to reflect locally. You can work around this problem by copying the style and using the token of the style-copy.

## Code
The javascript code that accompanies this map attaches event handlers to checkboxes. These handlers handle the work of adding and removing strings from the Filter arrays of toggled layers. 