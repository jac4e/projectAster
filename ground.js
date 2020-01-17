class Ground{
    
  
     constructor(x,y,z,i,j,k)
     {
        this.origin = new THREE.Vector3(x,y,z);

        this.side   = 2;
        

        this.floorGeometry = new THREE.BoxGeometry(this.side, this.side, this.side);
        this.floorMaterial = new THREE.MeshStandardMaterial({
            color: 0x00ff0f
        });
       
        

        // create an array of 2,2,2 cubes and render them
        this.floorArray = new Array(i);

        for( var n =0; n<i; n++)
        {
            this.floorArray[this.n] = new Array(j);
        }
        
        for(var n = 0; n <i;n++)
        {
            for(var m = 0; m<j; m++)
            {
               

                this.floorArray[n][m] = new THREE.Mesh(this.floorGeometry, this.floorMaterial);
                this.floorArray[n][m].position.set(x +n*this.side ,y,z + m*this.side);

            }

        }

       scene.add(floorArray[n][m]);
    };
    
};
